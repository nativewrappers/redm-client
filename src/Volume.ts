import { Vector3 } from "./utils";

export class Volume {
  private handle: number;
  constructor(coord: Vector3, rot: Vector3, scale: Vector3, customName?: string) {
    if (customName) {
      this.handle = CreateVolumeCylinderWithCustomName(
        coord.x,
        coord.y,
        coord.z,
        rot.x,
        rot.y,
        rot.z,
        scale.x,
        scale.y,
        scale.z,
        customName as unknown as number,
      );
      return;
    }

    this.handle = CreateVolumeCylinder(
      coord.x,
      coord.y,
      coord.z,
      rot.x,
      rot.y,
      rot.z,
      scale.x,
      scale.y,
      scale.z,
    );
  }

  get Handle(): number {
    return this.handle;
  }
}
