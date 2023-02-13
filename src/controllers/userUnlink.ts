import type { Request, Response } from 'express';

// Оповещение о разъединении аккаунтов
// https://yandex.ru/dev/dialogs/smart-home/doc/reference/unlink.html
export const userUnlinkController = (req: Request, res: Response): void => {
  res.json({
    request_id: req.header('X-Request-Id')!,
  });
};
