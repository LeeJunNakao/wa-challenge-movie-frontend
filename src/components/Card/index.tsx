import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import * as S from "./styles";

type Props = {
  image: string;
  title: string;
  score: number;
  description: string;
  director: string;
  producer: string;
  releaseDate: number;
};

export default function MovieCard(props: Props) {
  return (
    <Card sx={{ maxWidth: 345, height: 600 }}>
      <CardHeader
        title={props.title}
        subheader={`Score: ${props.score} / 100`}
      />
      <CardMedia
        component="img"
        height="194"
        image={props.image}
        alt={props.title}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          <span>Director: </span>
          <span>{props.director}</span>
        </Typography>

        <Typography variant="body2" color="text.secondary">
          <span>Producer: </span>
          <span>{props.producer}</span>
        </Typography>

        <Typography variant="body2" color="text.secondary">
          <span>Release: </span>
          <span>{props.releaseDate}</span>
        </Typography>
      </CardContent>

      <S.Description>
        <Typography variant="body2" color="text.secondary">
          {props.description}
        </Typography>
      </S.Description>
    </Card>
  );
}
