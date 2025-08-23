export const autsigninhMapper = (user: { name: string; role: string }) => {
	return {
		name: user.name,
		role: user.role,
	};
};
