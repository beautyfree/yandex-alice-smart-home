FROM node:18.20-alpine AS builder

USER node

RUN mkdir -p /home/node/app

WORKDIR /home/node/app

COPY --chown=node . .

RUN yarn install 
# fix type module in proxmox-api
RUN sh change_type.sh
# Building the production-ready application code
RUN yarn build

FROM node:18.20-alpine

USER node

WORKDIR /home/node/app

COPY --from=builder --chown=node /home/node/app/node_modules ./node_modules
# Copying the production-ready application code, so it's one of few required artifacts
COPY --from=builder --chown=node /home/node/app/dist ./dist
COPY --from=builder --chown=node /home/node/app/public ./public
COPY --from=builder --chown=node /home/node/app/package.json .x
# greenlock
COPY --from=builder --chown=node /home/node/app/greenlock.d ./greenlock.d
COPY --from=builder --chown=node /home/node/app/.greenlockrc ./.greenlockrc

CMD [ "yarn", "start" ]

EXPOSE 3005