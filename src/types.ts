type DeviceType =
  | 'devices.types.light'
  | 'devices.types.socket'
  | 'devices.types.switch'
  | 'devices.types.thermostat'
  | 'devices.types.thermostat.ac'
  | 'devices.types.media_device'
  | 'devices.types.media_device.tv'
  | 'devices.types.media_device.tv_box'
  | 'devices.types.media_device.receiver'
  | 'devices.types.cooking'
  | 'devices.types.cooking.coffee_maker'
  | 'devices.types.cooking.kettle'
  | 'devices.types.cooking.multicooker'
  | 'devices.types.openable'
  | 'devices.types.openable.curtain'
  | 'devices.types.humidifier'
  | 'devices.types.purifier'
  | 'devices.types.vacuum_cleaner'
  | 'devices.types.washing_machine'
  | 'devices.types.dishwasher'
  | 'devices.types.iron'
  | 'devices.types.sensor'
  | 'devices.types.pet_drinking_fountain'
  | 'devices.types.pet_feeder'
  | 'devices.types.other';

export type CapabilityType =
  | 'devices.capabilities.on_off'
  | 'devices.capabilities.color_setting'
  | 'devices.capabilities.mode'
  | 'devices.capabilities.range'
  | 'devices.capabilities.toggle';

// TODO: add range
// TODO: add toggle
// TODO: add modes types
type CapabilityParameters =
  | {
      split?: boolean;
    }
  | {
      color_model: string;
      temperature_k: {
        min: number;
        max: number;
      };
      color_scene: {
        scenes: {
          id:
            | 'alarm'
            | 'alice'
            | 'candle'
            | 'dinner'
            | 'fantasy'
            | 'garland'
            | 'jungle'
            | 'movie'
            | 'neon'
            | 'night'
            | 'ocean'
            | 'party'
            | 'reading'
            | 'rest'
            | 'romance'
            | 'siren'
            | 'sunrise'
            | 'sunset';
        }[];
      };
    }
  | {
      protocols: ['hls'];
    }
  | {
      instance:
        | 'cleanup_mode'
        | 'coffee_mode'
        | 'dishwashing'
        | 'fan_speed'
        | 'heat'
        | 'input_source'
        | 'program'
        | 'swing'
        | 'tea_mode'
        | 'thermostat'
        | 'work_speed';
      modes: { value: string }[];
    };

export type CapabilityInfo = {
  type: CapabilityType;
  retrievable: boolean;
  reportable: boolean;
  parameters: CapabilityParameters;
};

// TODO
export type Property = {};

export type Device<T = undefined> = {
  id: string;
  name: string;
  description?: string;
  room?: string;
  type: DeviceType;
  custom_data?: T;
  capabilities: CapabilityInfo[];
  properties?: Property[]; // TODO: check
  device_info?: {
    manufacturer: string;
    model: string;
    hw_version?: string;
    sw_version?: string;
  };
};

export type CapabilityState = {
  type: CapabilityType;
  state: {
    instance: string;
    value: any;
  };
};

export type ProxmoxVM = {
  nodeName: string;
  vmId: number;
  isQemu: boolean;
  isLxc: boolean;
};

// https://yandex.ru/dev/dialogs/smart-home/doc/concepts/response-codes.html#codes__codes-api
export type ErrorCode =
  | 'DOOR_OPEN'
  | 'LID_OPEN'
  | 'REMOTE_CONTROL_DISABLED'
  | 'NOT_ENOUGH_WATER'
  | 'LOW_CHARGE_LEVEL'
  | 'CONTAINER_FULL'
  | 'CONTAINER_EMPTY'
  | 'DRIP_TRAY_FULL'
  | 'DEVICE_STUCK'
  | 'DEVICE_OFF'
  | 'FIRMWARE_OUT_OF_DATE'
  | 'NOT_ENOUGH_DETERGENT'
  | 'HUMAN_INVOLVEMENT_NEEDED'
  | 'DEVICE_UNREACHABLE'
  | 'DEVICE_BUSY'
  | 'INTERNAL_ERROR'
  | 'INVALID_ACTION'
  | 'INVALID_VALUE'
  | 'NOT_SUPPORTED_IN_CURRENT_MODE'
  | 'ACCOUNT_LINKING_ERROR'
  | 'DEVICE_NOT_FOUND';
