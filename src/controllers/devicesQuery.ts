import type { Request, Response } from 'express';

import { proxmox } from '../services';
import type { CapabilityState, ErrorCode, ProxmoxVM } from '../types';
import type { Property } from './../types';

type Device<T = undefined> = {
  id: string;
  custom_data?: T;
};

type DeviceResponse = {
  id: string;
  capabilities?: CapabilityState[];
  properties?: Property[];
  error_code?: ErrorCode;
  error_message?: string;
};

type DevicesQueryRequest<T> = {
  devices: Device<T>[];
};

type DevicesQueryResponse = {
  request_id: string;
  payload: {
    devices: DeviceResponse[];
  };
};

async function processOnOff(
  device: Device<ProxmoxVM>,
): Promise<CapabilityState> {
  if (!device.custom_data) {
    throw new Error('No custom data');
  }

  const node = proxmox.nodes.$(device.custom_data.nodeName);

  let value = false;
  let status = '';

  if (device.custom_data.isQemu) {
    const res = await node.qemu
      .$(device.custom_data.vmId)
      .status.current.$get();
    status = res.status;
  }

  if (device.custom_data.isLxc) {
    const res = await node.lxc.$(device.custom_data.vmId).status.current.$get();
    status = res.status;
  }

  if (status === 'stopped') {
    value = false;
  }

  if (status === 'running') {
    value = true;
  }

  return {
    type: 'devices.capabilities.on_off',
    state: {
      instance: 'on',
      value,
    },
  };
}

// Информация о состояниях устройств пользователя
// https://yandex.ru/dev/dialogs/smart-home/doc/reference/post-devices-query.html
export const devicesQueryController = async (
  req: Request<null, null, DevicesQueryRequest<ProxmoxVM>>,
  res: Response<DevicesQueryResponse>,
): Promise<void> => {
  const devices = await Promise.all(
    req.body.devices.map(async (device): Promise<DeviceResponse> => {
      return {
        id: device.id,
        capabilities: [await processOnOff(device)],
      };
    }),
  );

  res.json({
    request_id: req.header('X-Request-Id')!,
    payload: {
      devices,
    },
  });
};
