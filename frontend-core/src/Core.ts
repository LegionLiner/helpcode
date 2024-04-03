import ApiModule from "./CoreModules/ApiModule/ApiModule";
import { Core } from "./Interfaces/Types";
import { Api } from "./Interfaces/Types";

export default {
    api: new ApiModule() as Api,
} as Core;