export class Player {
	private handle: number;
  
	public static fromPedHandle(handle: number): Player {
	  return new Player(NetworkGetPlayerIndexFromPed(handle));
	}
  
	public static fromServerId(serverId: number): Player {
	  return new Player(GetPlayerFromServerId(serverId));
	}

	/**
	 * @param handle the player handle
	 */
	constructor(handle: number) {
		this.handle = handle;
	}
}