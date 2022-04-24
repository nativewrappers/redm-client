import { Vector3 } from "../utils";
import { Entity } from "./Entity"

export class Ped extends Entity {
	constructor(handle: number) {
		super(handle)
	}


	/**
	 * Blocks scenarios inbetween the specified vectors
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
	 * Adds armor to the ped
	 * @param amount the amount of armor to add
	 */
	addArmor(amount: number) {
		AddArmourToPed(this.Handle, amount);
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

	set MaxHealth(amount: number) {
		
	}
}