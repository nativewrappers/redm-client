import { CoreAttributesEnum, PedAttributesEnum, StatusEffect } from "./enums/Attributes";
import { Ped } from "./models/Ped";

export class CoreAttribute {
	private handle: number;
	private attribute: CoreAttributesEnum;
	constructor(ped: Ped, attribute: CoreAttributesEnum) {
		this.handle = ped.Handle
		this.attribute = attribute;
	}

	disableOverpower() {
		Citizen.invokeNative('0xF8DAC3D85636C241', this.handle, this.attribute);
	}

	enableOverpower(amount: number, makeSound: boolean = false) {
		Citizen.invokeNative('0x4AF5A4C7B9157D14', this.handle, this.attribute, amount, makeSound);
	}

	get Overpowered() {
		return Citizen.invokeNative<boolean>('0x200373A8DF081F22', this.attribute, Citizen.resultAsInteger())
	}

	get OverpoweredTimeLeft() {
		return Citizen.invokeNative<number>('0xB429F58803D285B1', this.handle, this.attribute, Citizen.resultAsInteger())
	}

	get CoreValue() {
		return GetAttributeCoreValue(this.handle, this.attribute);
	}

	set CoreValue(amount: number) {
		Citizen.invokeNative('0xC6258F41D86676E0', this.handle, this.attribute, amount)
	}
}

export class PedAttribute {
	private handle: number;
	private attribute: PedAttributesEnum;
	constructor(ped: Ped, attribute: PedAttributesEnum) {
		this.handle = ped.Handle
		this.attribute = attribute;
	}

	/**
	 * 
	 * @param attribute the attribute to add points to
	 * @param amount the amount of points to add
	 */
	addPoints(amount: number) {
		AddAttributePoints(this.handle, this.attribute, amount);
	}
	
	disableOverpower() {
		DisableAttributeOverpower(this.handle, this.attribute);
	}

	enableOverpower(amount: number, makeSound: boolean = false) {
		Citizen.invokeNative('0xF6A7C08DF2E28B28', this.handle, this.attribute, amount, makeSound);
	}

	get Points() {
		return GetAttributePoints(this.handle, this.attribute);
	}

	set Points(amount: number) {
		SetAttributePoints(this.handle, this.attribute, amount);
	}

	get Rank() {
		return GetAttributeRank(this.handle, this.attribute)
	}
	
	set BaseRank(amount: number) {
		SetAttributeBaseRank(this.handle, this.attribute, amount)
	}

	get BaseRank(): number {
		return GetAttributeBaseRank(this.handle, this.attribute);
	}

	set BonusRank(amount: number) {
		SetAttributeBonusRank(this.handle, this.attribute, amount)
	}

	get BonusRank(): number {
		return GetAttributeBonusRank(this.handle, this.attribute);
	}

	get MaxRank() {
		return Citizen.invokeNative<number>('0x704674A0535A471D', this.attribute, Citizen.resultAsInteger())
	}

	get Overpowered() {
		return Citizen.invokeNative<boolean>('0x103C2F885ABEB00B', this.attribute, Citizen.pointerValueInt())
	}
}


// There's probably a better way to do this but this will do for now as it reduces repetition
export class Attributes {
	private pedAttributes: Map<number, PedAttribute> = new Map();
	private coreAttributes: Map<number, CoreAttribute> = new Map();
	constructor(ped: Ped) {
		for(let i = 0; i <= 21; i++) {
			this.pedAttributes.set(i, new PedAttribute(ped, i as PedAttributesEnum))
		}

		for(let i = 0; i <= 2; i++) {
			this.coreAttributes.set(i, new CoreAttribute(ped, i as CoreAttributesEnum))
		}
	}

	getCore(attribute: CoreAttributesEnum) {
		if (attribute > 2) throw new RangeError("The max enum for CoreAttribute is 2!")
		// This should always be valid
		return this.coreAttributes.get(attribute) as CoreAttribute;
	}

	get(attribute: PedAttributesEnum) {
		if (attribute > 22) throw new RangeError("The max enum for PedAttribute is 22!")
		return this.pedAttributes.get(attribute) as PedAttribute;
	}

	set CoreIcon(status: StatusEffect) {
		Citizen.invokeNative('0xA4D3A1C008F250DF', status);
	}

	set PeriodicIcon(status: StatusEffect) {
		Citizen.invokeNative('0xFB6E111908502871', status);
	}
}