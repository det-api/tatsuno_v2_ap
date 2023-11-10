import { autoPermitGet } from "../service/autoPermit.service";
import { getDevice } from "../service/device.service";
import { drop, get, mqttEmitter, set } from "../utils/helper";

export const apController = async (depNo: string, nozzleNo: string) => {
  let mode = await get("mode");
  let approved = await get(nozzleNo);

  if (!mode) {
    let result = await autoPermitGet();
    await set("mode", result?.mode);
  }

  if (mode == "allow" && !approved) {
    mqttEmitter(`detpos/local_server/${depNo}`, nozzleNo + "appro");
    set(nozzleNo, "approved");
  }
};

export const apPPController = async (depNo: string, nozzleNo: string) => {
  let approved = await get(nozzleNo);
  if (approved) await drop(nozzleNo);
};

export const apFinalDropController = async (
  depNo: string,
  nozzleNo: string
) => {

  let devType = await get("dep_" + depNo.trim());
  let approved = await get(nozzleNo);
  if (!devType) {
    let device = await getDevice({ dep_no: depNo });
    await set(`dep_${depNo}`, device[0].dep_type);
    devType = await get(`dep_${depNo}`);
  }

  if (devType == "tatsuno" && approved) {
    await drop(nozzleNo);
  }
};
