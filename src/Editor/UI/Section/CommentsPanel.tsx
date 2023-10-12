import { Avatar, Box, Button, IconButton, Paper, Typography } from '@mui/material';
import { useRichTextEditorContext } from 'mui-tiptap';
import { characterMark, paragraphMark } from '../../../../utils/specialCharacter';
import { ParaStyleClass } from '../../Extensions/ExtendedExtensions/CustomHeading';
import TextField from '@mui/material/TextField';
import { useEffect, useRef, useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import { deepOrange } from '@mui/material/colors';
import CommentIcon from '@mui/icons-material/Comment';
import { AttributresForComments, Comment, CommentPluginName } from '../../Extensions/Extensions/Comments/Comments';
import { styled } from '@mui/system';



const CustomInput = styled(TextField)({
    // Define your custom styles for a smaller input size
    width: '100%', // Set the width to 100% as an example
    margin: '8px 0', // Add some margin for spacing
    padding: '8px 10px', // Adjust padding for smaller size
    //    fontSize: '0.8rem', // Set font size to make it smaller
});


export const CommentsPanel = () => {
    const editor = useRichTextEditorContext();
    const styleListRef = useRef<HTMLDivElement | null>(null);

    const CommentAddButton = (
        <Button
            size='small'
            variant="text"
            onClick={() => {
                if (editor) {
                    editor.chain().focus().addComment({ comment: "" }).run();
                }
            }}
            endIcon={<CommentIcon />}
        >
            New
        </Button>
    )


    const LeadComment = () => {
        return (
            <Box>
                <Typography style={{ marginLeft: '20px' }} component="p">
                    Surya K
                </Typography>
            </Box>
        )
    }

    const CommentItem = ({ comment }: { comment: AttributresForComments }) => {
        const { mark, id, pos } = comment;
        const [newComment, setNewComment] = useState('');
        const commentAttributes = mark.attrs;
        const commentData: Comment = JSON.parse(commentAttributes.comment);
        console.log(commentData);
        const isNowReply = commentData.comment != "";

        const handelUpdateComment = (TYPE: "UpdateLeadComment" | "AddReplyComment") => {
            if (!editor) return;
            if (TYPE == "UpdateLeadComment") {
                commentData.comment = newComment;
            } else if (TYPE == "AddReplyComment") {
                commentData.replies?.push({
                    author: "new",
                    comment: newComment,
                    date: 'Today',
                    initials: 'A'
                });
            }
            editor.chain().focus().updateComment({ id, pos, comment: commentData })
        }

        return (
            <Paper style={{ padding: '5px', position: 'relative', marginLeft: '10px' }} elevation={5}>
                <Avatar
                    style={{ position: 'absolute', left: -10, top: '5px' }}
                    sx={{ bgcolor: deepOrange[500], width: 22, height: 22 }}
                // alt="Remy Sharp"
                >
                    S
                </Avatar>
                <Typography style={{ marginLeft: '20px' }} component="p">
                    {commentData.comment}
                </Typography>
                {commentData.replies?.map(reply => (
                    <Typography style={{ margin: '5px', borderLeft: '2px solid blue', paddingLeft: '5px' }} component="p">
                        {reply.comment}
                    </Typography>
                ))}
                <CustomInput
                    size='small'
                    id="outlined-basic"
                    fullWidth
                    // label={isNowReply ? "Reply" : "Comment"}
                    placeholder={isNowReply ? "Reply" : "Comment"}
                    style={{ padding: 0 }}
                    inputProps={{
                        style: {
                            padding: "4px",
                        }
                    }}
                    variant="outlined"
                    value={newComment}
                    onChange={(e) => {
                        setNewComment(e.target.value);
                    }}
                />
                <Box display={'flex'} justifyContent={'flex-end'}>
                    <IconButton
                        onClick={() => handelUpdateComment(isNowReply ? "AddReplyComment" : 'UpdateLeadComment')}
                        size="small">
                        <SendIcon fontSize="inherit" />
                    </IconButton>
                    <IconButton
                        onClick={() => {
                            if (editor) {
                                editor.commands.setTextSelection({ ...pos, });
                                editor.commands.unsetMark(CommentPluginName);
                            }
                        }}
                        size="small">
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                </Box>
            </Paper>
        )
    }


    return (
        <div ref={styleListRef} style={{ padding: '10px', display: 'flex', flexDirection: 'column', gap: '10px', overflowY: 'auto', height: '100%', scrollbarGutter: 'stable' }}>
            {CommentAddButton}
            {editor?.storage.comments.commentsList.map((comment: AttributresForComments) => {
                console.log(comment);
                return <CommentItem comment={comment} />
            })}
        </div>
    )
}
