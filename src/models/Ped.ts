import { Attributes } from "../Attribute";
import { Vector3 } from "../utils";
import { Entity } from "./Entity"

export class Ped extends Entity {
	private attributes: Attributes | undefined;

	constructor(handle: number) {
		super(handle)
	}


	/**
	 * Blocks scenarios inbetween the specified vectors
	 * @todo Move to Game
	 * @param vec1 
	 * @param vec2 
	 * @param blockingFlags you can find blocking flags [here](https://github.com/Halen84/RDR3-Native-Flags-And-Enums/blob/main/ADD_SCENARIO_BLOCKING_AREA/README.md)
	 * @returns the scenarioId that can be used in {@link removeScenarioBlock} to unblock
	 */
	static blockScenariosInArea(vec1: Vector3, vec2: Vector3, blockingFlags: number) {
		return AddScenarioBlockingArea(vec1.x, vec1.y, vec1.z, vec2.x, vec2.y, vec2.z, true as unknown as number, blockingFlags)
	}

	/**
	 * Removes the blocking of scenarios in the specified area
	 * @param scenarioId the number returned from {@link blockScenariosInArea}
	 */
	static removeScenarioBlock(scenarioId: number) {
		RemoveScenarioBlockingArea(scenarioId, false);
	}

	/**
	 * kills the ped, optionally sets the killer
	 * @param killer the entity that killed the ped
	 */
	killPed(killer?: Entity) {
		SetEntityHealth(this.Handle, 0, killer ? killer.Handle : 0);
	} 

	set Health(amount: number) {
		SetEntityHealth(this.Handle, amount, 0);
	}

	get Health(): number {
		return GetEntityHealth(this.Handle);
	}

	/**
	 * While this increases the peds max health, if used on a player it wont increase the max core value on the hud
	 */
	set MaxHealth(amount: number) {
		SetPedMaxHealth(this.Handle, amount);
	}

	get MaxHealth() {
		return GetPedMaxHealth(this.Handle);
	}

	get Attributes() {
		if (this.attributes) return this.attributes;

		return this.attributes = new Attributes(this);
	}

	damage(amount: number, boneId = 0, killer?: Ped) {
		ApplyDamageToPed(this.Handle, amount, 0, boneId, killer ? killer.Handle : 0)
	}

	get CanBeKnockedOffVehicle() {
		return CanKnockPedOffVehicle(this.Handle)
	}

	/**
	 * this returns a different type then the getter so we can't use set, maybe ts will fix soon (tm)
	 * @param state how hard it will be to knock a ped off their vehicle
	 */
	setCanBeKnockedOffVehicle(state: KnockOffVehicle) {
		SetPedCanBeKnockedOffVehicle(this.Handle, state);
	}

}