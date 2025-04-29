import { IconType } from "@/components";

export interface IMenuItem {
  key: string;
  icon?: IconType;
  label: string;
  isTitle?: boolean;
  url?: string;
  children?: IMenuItem[];
}
