import UsersList from '../components/UsersList';

function Users() {
  const USERS = [
    {
      id: 'u1',
      name: 'Javier',
      image: 'https://randomuser.me/api/portraits/men/91.jpg',
      places: 3,
    },
  ];

  return (
    <>
      <UsersList items={USERS} />
    </>
  );
}

export default Users;
