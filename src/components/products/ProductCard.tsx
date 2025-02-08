import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

import { ContentModelInterface } from "../../../server/models/content";
import { contentApi } from "../../apis/content";
import { useContentDispatch } from "../../contexts/ContentProvider";
import { ContentsProviderActions, FrontMessages } from "../../enums/Enum";

interface ProductCardProps {
  content: ContentModelInterface;
}

/**
 * 一覧画面 コンテンツ単体
 *
 * @param {Object} props: ProductCardProps
 * @param {ContentModelInterface} props.content: コンテンツ単体データ
 * @returns {JSX.Element}
 */
const ProductCard: React.FC<ProductCardProps> = ({ content }) => {
  // state更新処理
  const dispatch = useContentDispatch();
  const navigate = useNavigate();
  // 画像情報
  let imageUrl: string = "";
  let imageTitle: string = "";
  if (
    content.uploadFile != null &&
    content.uploadFileMineType != null &&
    content.uploadFileName != null
  ) {
    imageTitle = content.uploadFileName;
    imageUrl = `data:${content.uploadFileMineType};base64,${content.uploadFile}`;
  }

  // 編集ボタン押下時
  const editContents = () => {
    // 編集ページに遷移する
    navigate(`/products/edit/${content._id}`);
  };

  // 削除ボタン押下時
  const deleteContents = () => {
    const deleteConfirm = confirm(FrontMessages.CONFIRM_DELETE);
    // 削除キャンセル
    if (!deleteConfirm) {
      return;
    }
    // 削除OK
    contentApi
      .deleteByID(content._id)
      .then((res) => {
        dispatch({
          type: ContentsProviderActions.DELETE,
          payload: res.data.data,
        });
        // 削除完了メッセージ＋再描画のためリロード
        alert(FrontMessages.SUCCESS_DELETE);
        window.location.reload();
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <>
      <Grid
        key={content._id}
        size={{ xs: 2, sm: 4, md: 4 }}
      >
        <Card
          key={content._id}
          sx={{ maxWidth: 345 }}
        >
          <CardMedia
            component="img"
            sx={{ height: 150 }}
            image={imageUrl}
            alt="No Image"
            title={imageTitle}
          />

          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
            >
              {content.title}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "text.secondary" }}
            >
              {content.comment}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              onClick={editContents}
            >
              編集
            </Button>
            <Button
              size="small"
              onClick={deleteContents}
            >
              削除
            </Button>

            {imageUrl ? (
              <span className="image-icon">画像</span>
            ) : (
              <span className="text-icon">テキスト</span>
            )}
          </CardActions>
        </Card>
      </Grid>
    </>
  );
};

export default ProductCard;
