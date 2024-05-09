import { Avatar, Grow } from '@mui/material';

export default function AvatarList({
    items,
    returnSelectedItem,
    randomItemIDs,
}) {
    return (
        <>
            {items.map((item, index) => {
                if (randomItemIDs.includes(index)) {
                    return (
                        <Grow
                            in={true}
                            key={item.avatarName}
                            style={{ transformOrigin: '0 0 0' }}
                            timeout={500 + index * 2}
                        >
                            <Avatar
                                variant='circular'
                                key={item.avatarName}
                                alt={item.avatarName}
                                src={item.avatarImage}
                                sx={{
                                    width: 100,
                                    height: 100,
                                }}
                                onClick={() =>
                                    returnSelectedItem(item.avatarName)
                                }
                            />
                        </Grow>
                    );
                }
            })}
        </>
    );
}
