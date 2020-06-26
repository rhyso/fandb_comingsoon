const secrets = {
    dbUri: "mongodb://fandb_comingsoon_user_rhys:2-8gV#rqVHKDm9e@ds351827.mlab.com:51827/fandb_comingsoon"
}

export const getSecret = key => secrets[key]