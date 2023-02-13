import type { Request, Response } from 'express';

// Проверка доступности Endpoint URL провайдера
// https://yandex.ru/dev/dialogs/smart-home/doc/reference/check.html
export const checkController = (_req: Request, res: Response): void => {
  // eslint-disable-next-line turisap/no-magic-numbers
  res.status(200);
};
