import 'dotenv'
import provideToken from '../common/provideToken'
import {Branch} from "../models/branches.models";

class BranchesServices {

    public async getBranches() {
        const branchesDb = await Branch.findAll({});
        return branchesDb
    }

    public async getOneBranch(id: number) {
        const branchesDb = await Branch.findOne({where: {id}});
        return branchesDb
    }
}
export default new BranchesServices()