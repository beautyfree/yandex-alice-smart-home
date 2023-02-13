import type { Request, Response } from 'express';

import { proxmox } from '../services';
import type { CapabilityState, CapabilityType, ProxmoxVM } from '../types';

type ActionResult = {
  status: 'DONE' | 'ERROR';
  error_code?: 'INVALID_ACTION';
  error_message?: 'the human readable error message';
};

type CapabilityActionResponse = {
  type: CapabilityType;
  state: {
    instance: string;
    action_result: ActionResult;
  };
};

type Device<T = undefined, C = CapabilityState> = {
  id: string;
  custom_data?: T;
  capabilities: C[];
};

type DevicesActionRequest<T> = {
  payload: {
    devices: Device<T>[];
  };
};

type DevicesActionResponse = {
  request_id: string;
  payload: {
    devices: Device<undefined, CapabilityActionResponse>[];
  };
};

async function processOnOff(
  device: Device<ProxmoxVM, CapabilityState>,
  capability: CapabilityState,
): Promise<CapabilityActionResponse> {
  if (!device.custom_data) {
    throw new Error('No custom data');
  }

  const node = proxmox.nodes.$(device.custom_data.nodeName);

  let switched = false;

  if (device.custom_data.isQemu) {
    try {
      if (capability.state.value) {
        await node.qemu.$(device.custom_data.vmId).status.start.$post();
      } else {
        await node.qemu.$(device.custom_data.vmId).status.stop.$post();
      }

      switched = true;
    } catch (error) {}
  }

  if (device.custom_data.isLxc) {
    try {
      if (capability.state.value) {
        await node.lxc.$(device.custom_data.vmId).status.start.$post();
      } else {
        await node.lxc.$(device.custom_data.vmId).status.stop.$post();
      }

      switched = true;
    } catch (error) {}
  }

  return {
    type: 'devices.capabilities.on_off',
    state: {
      instance: 'on',
      action_result: {
        status: switched ? 'DONE' : 'ERROR',
      },
    },
  };
}

// Изменение состояния у устройств
//yandex.ru/dev/dialogs/smart-home/doc/reference/post-action.html
export const devicesActionController = async (
  req: Request<null, null, DevicesActionRequest<ProxmoxVM>>,
  res: Response<DevicesActionResponse>,
): Promise<void> => {
  const devices = await Promise.all(
    req.body.payload.devices.map(
      async (device): Promise<Device<undefined, CapabilityActionResponse>> => {
        const capabilities = await Promise.all(
          device.capabilities.map(
            (capability): Promise<CapabilityActionResponse> => {
              switch (capability.type) {
                case 'devices.capabilities.on_off':
                  return processOnOff(device, capability);
                default:
                  throw new Error(
                    `The capability ${capability.type} is not supported`,
                  );
              }
            },
          ),
        );

        return {
          id: device.id,
          capabilities,
        };
      },
    ),
  );

  res.json({
    request_id: req.header('X-Request-Id')!,
    payload: {
      devices,
    },
  });
};
