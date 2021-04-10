import { Category } from ".prisma/client";
import { useDiscussions } from "@components/providers/DiscussionsWrapper";
import DiscussionsWrapper from "@lib/client/wrapper/discussions";
import { Card, CardContent, FilledInput, FormControl, IconButton, InputAdornment, InputLabel, List, ListItem, ListItemAvatar, ListItemText, Typography, useTheme } from "@material-ui/core";
import { SendRounded } from "@material-ui/icons";
import { Fragment, useState } from "react";

const DiscussionCard = ({ category }: { category: Category }) => {
    const [message, setMessage] = useState("");
    const { messages, addMessage } = useDiscussions();
    const [disabled, setDisabled] = useState(false);
    const theme = useTheme();

    const wrapper = new DiscussionsWrapper();
    
    const send = async () => {
        try {
            setDisabled(true);
            const resp = await wrapper.create({
                content: message,
                category: category.id,
            });

            setMessage("");
            addMessage(resp.data);
        } catch {}
        setDisabled(false);
    };


    return (
        <Card>
            <CardContent>
                <List ref={(el) => {
                    if(!el) return;
                    el.scrollTop = el.scrollHeight;
                }} style={{ overflowY: "scroll", maxHeight: 300, marginBottom: theme.spacing(2) }}>
                    {messages.filter(({ categoryId }) => categoryId === category.id).map((message) => (
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar style={{ fontSize: 24 }}>    
                                {message.sender.image}
                            </ListItemAvatar>
                            <ListItemText
                                primary={<Fragment>
                                    {message.sender.name}
                                    <Typography variant="caption">
                                        {` • ${new Date(message.sentat).toLocaleDateString()} ${new Date(message.sentat).toLocaleTimeString()}`}
                                    </Typography>
                                </Fragment>}
                                secondary={message.content}
                            />
                        </ListItem>
                    ))}
                </List>
                <FormControl fullWidth variant="filled">
                    <InputLabel htmlFor="filled-adornment-password">Ide írhatod az üzenetedet</InputLabel>
                    <FilledInput
                        type={"text"}
                        value={message}
                        multiline
                        onChange={({ target: { value } }) => setMessage(value)}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton onClick={send} disabled={message.length === 0 || disabled}>
                                    <SendRounded />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
            </CardContent>
        </Card>
    );
};

export default DiscussionCard;