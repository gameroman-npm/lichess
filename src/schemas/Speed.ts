import * as z from "zod";

const Speed = z.literal(["ultraBullet","bullet","blitz","rapid","classical","correspondence"]);

type Speed = z.infer<typeof Speed>;

export { Speed };
export default Speed;
