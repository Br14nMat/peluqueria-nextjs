import { Card, CardContent } from './card';
import Image from 'next/image';

interface UserCardProps {
  name: string;
  imageUrl: string;
}

const UserCard: React.FC<UserCardProps> = ({ name, imageUrl }) => {
  return (
    <Card className="bg-gray-100 max-w-xs rounded-lg">
      <CardContent className="flex flex-col items-center p-4">
        <Image src={imageUrl} alt={name} width={80} height={80} className="rounded-full" />
        <h2 className="mt-4 text-lg font-semibold">{name}</h2>
      </CardContent>
    </Card>
  );
};

export default UserCard;
