const { request, response } = require("express");

const isAdminRole = (req = request, res = response, next) => {
	if (!req.user)
		return res.status(500).json({
			msg: "It can not validate role without validate token before",
		});

	const { role, name } = req.user;

	if (role !== "ADMIN")
		return res.status(401).json({
			msg: `${name} is not an administrator`,
		});

	next();
};

const hasRole = ( ...roles ) => {

    return(req = request, res = response, next ) => {

        if (!req.user)
		return res.status(500).json({
			msg: "It can not validate role without validate token before",
		});

        if(!roles.includes( req.user.role )) return res.status(401).json({
            msg:`It must have some this roles ${ roles }`
        });

        next();

    }

}

module.exports = {
	isAdminRole,
    hasRole
};
