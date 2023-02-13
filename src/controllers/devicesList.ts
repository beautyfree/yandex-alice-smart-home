import type { Request, Response } from 'express';
import type { Proxmox } from 'proxmox-api';
import generate from 'uuid-by-string';

import { proxmox } from '../services';
import type { Device, ProxmoxVM } from '../types';

type DevicesListResponse<T> = {
  request_id: string;
  payload: {
    user_id: string;
    devices: Device<T>[];
  };
};

function makeDevice(
  vm: Proxmox.nodesQemuVm | Proxmox.nodesLxcVm,
  name: string,
  nodeName: string,
  isQemu: boolean,
  isLxc: boolean,
): Device<ProxmoxVM> {
  const uuid = generate(`${vm.vmid}${name}`);

  return {
    id: uuid,
    name: name.replace('.', ''),
    description: 'proxmox vm',
    room: 'Космос',
    type: 'devices.types.other',
    custom_data: {
      nodeName,
      vmId: vm.vmid,
      isQemu,
      isLxc,
    },
    capabilities: [
      {
        type: 'devices.capabilities.on_off',
        retrievable: true,
        reportable: false,
        parameters: {
          split: false,
        },
      },
    ],
    // properties: object[],
    // device_info: {
    //   manufacturer: string,
    //   model: string,
    //   hw_version: string,
    //   sw_version: string,
    // },
  };
}

// Информация об устройствах пользователя
// https://yandex.ru/dev/dialogs/smart-home/doc/reference/get-devices.html
export const devicesListController = async (
  req: Request,
  res: Response<DevicesListResponse<ProxmoxVM>>,
): Promise<void> => {
  const nodes = await proxmox.nodes.$get();

  const devices: Device<ProxmoxVM>[] = [];

  for (const node of nodes) {
    const theNode = proxmox.nodes.$(node.node);
    // list Qemu VMS
    const qemus = await theNode.qemu.$get({ full: true });

    // iterate Qemu VMS
    for (const qemu of qemus) {
      // do some suff.
      const status = await theNode.qemu.$(qemu.vmid).status.current.$get();

      devices.push(
        makeDevice(qemu, status.name as string, node.node, true, false),
      );
    }

    const lxcs = await theNode.lxc.$get();

    for (const lxc of lxcs) {
      const status = await theNode.lxc.$(lxc.vmid).status.current.$get();

      devices.push(
        makeDevice(lxc, status.name as string, node.node, false, true),
      );
    }
  }

  res.json({
    request_id: req.header('X-Request-Id')!,
    payload: {
      user_id: '1',
      devices,
    },
  });
};
