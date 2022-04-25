import { Attributes } from "../Attribute";
import { eDamageCleanliness, KnockOffVehicle, TamingState } from "../enums/Ped";
import { VehicleSeat } from "../enums/VehicleSeat";
import { _N, Vector3 } from "../utils";
import { Entity } from "./Entity"
import { Vehicle } from "./Vehicle";
import { Player } from "./Player";

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

	get InVehicle() {
		return IsPedInAnyVehicle(this.Handle, true);
	}

	get IsInjured() {
		return IsPedInjured(this.Handle);
	}

	get IsFatallyInjured() {
		return IsPedFatallyInjured(this.Handle);
	}

	get IsPlayer() {
		return IsPedAPlayer(this.Handle);
	}

	get Heading() {
		return GetEntityHeading(this.Handle);
	}

	set Heading(heading: number) {
		SetEntityHeading(this.Handle, heading)
	}

	get IsShooting() {
		return IsPedShooting(this.Handle);
	}

	get Accuracy() {
		return GetPedAccuracy(this.Handle)
	}

	set Accuracy(accuracy: number) {
		SetPedAccuracy(this.Handle, accuracy);
	}

	get CanBeKnockedOffVehicle() {
		return CanKnockPedOffVehicle(this.Handle)
	}

	get IsMale() {
		return IsPedMale(this.Handle);
	}

	get IsHuman() {
		return IsPedHuman(this.Handle);
	}

	get IsOnTopOfVehicle() {
		return IsPedOnVehicle(this.Handle);
	}

	get Vehicle() {
		return new Vehicle(GetVehiclePedIsIn(this.Handle, false));
	}

	get Mount() {
		// GET_LAST_MOUNT
		return new Ped(_N<number>("0x4C8B59171957BCF7" , this.Handle, Citizen.resultAsInteger()));
	}

	/**
	 * returns the horse that this ped is leading
	 */
	get LeadingHorse() {
		return new Ped(_N<number>("0x693126B5D0457D0D" , this.Handle, Citizen.resultAsInteger()));
	}

	/**
	 * returns the owner of the current animal
	 */
	get Owner() {
		// _GET_ACTIVE_ANIMAL_OWNER
		return new Ped(_N<number>("0xF103823FFE72BB49", this.Handle, Citizen.resultAsInteger()));
	}

	get TamingState() {
		// _GET_HORSE_TAMING_STATE
		return _N<TamingState>("0x454AD4DA6C41B5BD", this.Handle, Citizen.resultAsInteger());
	}

	get IsInteractingWithAnimal() {
		// _IS_ANIMAL_INTERACTION_RUNNING
		return _N<boolean>("0x7FC84E85D98F063D", this.Handle, Citizen.resultAsInteger());
	}

	get IsSittingInAnyVehicle() {
		return IsPedSittingInAnyVehicle(this.Handle);
	}

	get IsPlantingBomb() {
		return IsPedPlantingBomb(this.Handle);
	}

	get IsInAnyBoat() {
		return IsPedInAnyBoat(this.Handle);
	}

	get IsInAnyHeli() {
		return IsPedInAnyHeli(this.Handle);
	}

	get IsInAnyPlane() {
		return IsPedInAnyPlane(this.Handle);
	}

	get IsInFlyingVehicle() {
		return IsPedInFlyingVehicle(this.Handle);
	}

	get IsFalling() {
		return IsPedFalling(this.Handle);
	}

	get IsSliding() {
		// _IS_PED_SLIDING
		return _N<boolean>("0xD6740E14E4CEFC0B", this.Handle, Citizen.resultAsInteger())
	}

	get IsJumping() {
		return IsPedJumping(this.Handle);
	}

	get IsClimbing() {
		return IsPedClimbing(this.Handle);
	}

	get IsClimbingLadder() {
		// _IS_PED_CLIMBING_LADDER
		return _N<boolean>("0x59643424B68D52B5", this.Handle, Citizen.resultAsInteger());
	}

	get IsVaulting() {
		return IsPedVaulting(this.Handle)
	}

	get IsDiving() {
		return IsPedDiving(this.Handle);
	}

	get IsOpeningADoor() {
		return IsPedOpeningADoor(this.Handle);
	}

	set SeeingRange(value: number) {
		SetPedSeeingRange(this.Handle, value);
	}

	set HearingRange(value: number) {
		SetPedHearingRange(this.Handle, value);
	}

	get IsStealthed() {
		return GetPedStealthMovement(this.Handle);
	}

	get IsJacking() {
		return IsPedJacking(this.Handle);
	}

	get IsStunned() {
		return IsPedBeingStunned(this.Handle, 0);
	}

	get IsBeingJacked() {
		return IsPedBeingJacked(this.Handle);
	}

	get IsInCombatRoll() {
		return _N<boolean>("0xC48A9EB0D499B3E5", this.Handle, Citizen.resultAsInteger())
	}

	get CrouchMovement() {
		return _N<boolean>("0xD5FE956C70FF370B", this.Handle, Citizen.resultAsInteger())
	}

	/**
	 * returns true if {@link DamageCleanliness} was ever lower than {@link eDamageCleanliness.Good}
	 */
	get IsDamaged() {
		return _N<boolean>("0x6CFC373008A1EDAF", this.Handle, Citizen.resultAsInteger());
	}

	set IsDamaged(damaged: boolean) {
		_N("_SET_PED_DAMAGED", this.Handle, damaged);
	}

	get DamageCleanliness() {
		return _N<eDamageCleanliness>("0x88EFFED5FE8B0B4A", this.Handle, Citizen.resultAsInteger());
	}

	set DamageCleanliness(cleanliness: eDamageCleanliness) {
		_N("0x7528720101A807A5", this.Handle, cleanliness);
	}

	set DefenseModifier(amount: number) {
		_N("0x9B6808EC46BE849B", this.Handle, amount)
	}

	set CanBeTargeted(toggle: boolean) {
		SetPedCanBeTargetted(this.Handle, toggle)
	}

	// TODO: Team class wrapper


	// TODO: Bone wrapper `GET_PED_LAST_DAMAGE_BONE`

	/**
	 * returns the ped who jacked this ped
	 */
	getJacker() {
		return new Ped(GetPedsJacker(this.Handle));
	}


	setCrouchMovement(state: boolean, immediately: boolean = false) {
		_N("0x7DE9692C6F64CFE8", this.Handle, state, 0, immediately);
	}

	canBeTargetedByPlayer(player: Player, toggle: boolean) {
		SetPedCanBeTargettedByPlayer(this.Handle, player.Handle, toggle)
	}

	clearLastBoneDamage() {
		ClearPedLastDamageBone(this.Handle);
	}

	setOwnsAnimal(animal: Ped) {
		// SET_PED_OWNS_ANIMAL
		_N("0x931B241409216C1F", this.Handle, animal.Handle, false);
	}

	isInteractionPossible(animal: Ped) {
		// IS_ANIMAL_INTERACTION_POSSIBLE
		return _N<boolean>("0xD543D3A8FDE4F185", this.Handle, animal.Handle, Citizen.resultAsInteger());
	}

	isOnVehicle(vehicle: Vehicle) {
		return IsPedOnSpecificVehicle(this.Handle, vehicle.Handle);
	}

	isSittingInVehicle(vehicle: Vehicle) {
		return IsPedSittingInVehicle(this.Handle, vehicle.Handle);
	}

	warpOutOfVehicle() {
		// _WARP_PED_OUT_OF_VEHICLE
		_N("0xE0B61ED8BB37712F", this.Handle)
	}

	/**
	 * puts the ped onto the specified mount
	 * @param targetPed the horse to put the ped on
	 * @param seatIndex the seat index to put the ped on
	 */
	setOntoMount(targetPed: Ped, seatIndex: VehicleSeat) {
		// SET_PED_ONTO_MOUNT
		_N("0x028F76B6E78246EB", this.Handle, targetPed.Handle, seatIndex, true);
	}

	removeFromMount() {
		// REMOVE_PED_FROM_MOUNT
		_N("0x5337B721C51883A9", this.Handle, true, true);
	}

	/**
	 * 
	 * @param seatIndex the seat index to check
	 * @returns true of the specified seat is free on the mount
	 */
	isSeatFree(seatIndex: VehicleSeat) {
		return _N<boolean>("0xAAB0FE202E9FC9F0", this.Vehicle.Handle, seatIndex, Citizen.resultAsInteger());
	}

	/**
	 * Sets the ped into the specified vehicle
	 * @param vehicle the vehicle to put the ped into
	 * @param seatIndex the seat index to put the ped into
	 */
	setIntoVehicle(vehicle: Vehicle, seatIndex: VehicleSeat) {
		SetPedIntoVehicle(this.Handle, this.Handle, seatIndex)
	}

	/**
	 * kills the ped and optionally sets the killer
	 * @param killer the entity that killed the ped
	 */
	killPed(killer?: Entity) {
		SetEntityHealth(this.Handle, 0, killer ? killer.Handle : 0);
	}
	

	damage(amount: number, boneId = 0, killer?: Ped) {
		ApplyDamageToPed(this.Handle, amount, 0, boneId, killer ? killer.Handle : 0)
	}

	/**
	 * this returns a different type then the getter so we can't use set, maybe ts will fix soon (tm)
	 * @param state how hard it will be to knock a ped off their vehicle
	 */
	setCanBeKnockedOffVehicle(state: KnockOffVehicle) {
		SetPedCanBeKnockedOffVehicle(this.Handle, state);
	}

	/**
	 * Removes the specified ped if its not a player entity
	 */
	delete() {
		SetEntityAsMissionEntity(this.Handle, true, true);
		DeletePed(this.Handle);
	}

	/**
	 * creates a clone of the ped
	 * @param network if the ped should be a networked entity
	 * @param bScriptHostPed whether to register the ped as pinned to the script host in the R* network model.
	 * @param copyHeadBlend whether to copy the peds head blend
	 * @returns the cloned ped
	 */
	clone(network: boolean, bScriptHostPed: boolean, copyHeadBlend: boolean) {
		return new Ped(ClonePed(this.Handle, network, bScriptHostPed, copyHeadBlend));
	}

	/**
	 * clones the ped onto the target ped
	 * @param targetPed the ped to clone onto
	 */
	cloneTo(targetPed: Ped) {
		ClonePedToTarget(this.Handle, targetPed.Handle);
	}
}