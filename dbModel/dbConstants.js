const roles = {
    superAdmin: 1,
    users: 2,
    SalesRep: 3,
    MSL: 4,
    HCP: 5,
    Compliance: 6
}

const actions = {
    organization_addition: 1,
    organization_deletion: 2,
    organization_edit: 3,
    user_creation: 4,
    user_edition: 5,
    user_deletion: 6,
    content_edit: 7,
}


const logTypes = {
    login: 1,
    forgotPassword: 2,
    logout: 3,
    register: 4
}


module.exports = {
    roles, logTypes, actions,
};
