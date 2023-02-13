import proxmoxApi from 'proxmox-api';

import {
  PROXMOX_HOST,
  PROXMOX_TOKEN_ID,
  PROXMOX_TOKEN_SECRET,
} from '../constants';

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export const proxmox = proxmoxApi({
  host: PROXMOX_HOST,
  tokenID: PROXMOX_TOKEN_ID,
  tokenSecret: PROXMOX_TOKEN_SECRET,
});
