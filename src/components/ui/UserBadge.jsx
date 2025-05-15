const UserBadge = ({ user }) => {
  return (
    <div className="flex items-center p-2 rounded-lg bg-white shadow border border-gray-200">
      <img 
        src={user.avatar} 
        alt={user.name} 
        className="w-8 h-8 rounded-full object-cover mr-2" 
      />
      
      <div>
        <p className="text-sm font-medium text-gray-900">{user.name}</p>
        {user.role && (
          <p className="text-xs text-gray-500">{user.role}</p>
        )}
      </div>
    </div>
  );
};

export default UserBadge;