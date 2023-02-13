import fetch from 'cross-fetch';
import type { Proxmox } from 'proxmox-api';
import generate from 'uuid-by-string';

import { OAUTH_TOKEN, SKILL_ID } from './../constants';
import type { CapabilityInfo, Property } from './../types';

const BASE_URL = 'https://dialogs.yandex.net';

type Device = {
  id: string;
  capabilities: CapabilityInfo[];
  properties: Property[];
};

type StateRequest = {
  ts: number;
  payload: {
    user_id: string;
    devices: Device[];
  };
};

function makeDevice(
  vm: Proxmox.nodesQemuVm | Proxmox.nodesLxcVm,
  name: string,
  _nodeName: string,
  _isQemu: boolean,
  _isLxc: boolean,
): Device {
  const uuid = generate(`${vm.vmid}${name}`);

  return {
    id: uuid,
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
    properties: [{}],
  };
}

export async function alerts(): Promise<void> {
  const body: StateRequest = {
    ts: Date.now(),
    payload: {
      user_id: '1',
      devices: [],
    },
  };

  const res = await fetch(
    `${BASE_URL}/api/v1/skills/${SKILL_ID}/callback/state`,
    {
      method: 'POST',
      headers: {
        Authorization: `OAuth ${OAUTH_TOKEN}`,
        'Content-Type': 'application/json',
      },
      // @ts-ignore
      body,
    },
  );

  console.log(res);

  setTimeout(() => {
    void alerts();
  }, 10_000);
}
