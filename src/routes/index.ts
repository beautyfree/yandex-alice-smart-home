/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';

import {
  checkController,
  devicesActionController,
  devicesListController,
  devicesQueryController,
  healthController,
} from '../controllers';
import { userUnlinkController } from '../controllers/userUnlink';

// https://yandex.ru/dev/dialogs/smart-home/doc/reference/resources.html
const router = Router();

router.head('/v1.0', checkController);
router.post('/v1.0/user/unlink', userUnlinkController);
router.get('/v1.0/user/devices', devicesListController);
router.post('/v1.0/user/devices/query', devicesQueryController);
router.post('/v1.0/user/devices/action', devicesActionController);

// Health check
router.get('/health', healthController);

export default router;
