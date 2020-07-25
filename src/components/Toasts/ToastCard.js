import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import * as ToastsAction from '../../store/toasts/ToastsAction';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

const ToastCard = props => {
  const dispatch = useDispatch();
  console.log(props);

  const onClickRemoveNotification = useCallback(
    (event, data) => {
      dispatch(ToastsAction.removeById(props.item.id));
    }, [dispatch, props.item.id]
  );

  return (
    <Card key={props.item.id}>
      <CardContent>
        <CardHeader content={props.item.message}/>
        {/*<CardDescription content={props.item.message}/>*/}
      </CardContent>
      {/*<Card.Content extra>*/}
      {/*  <Button*/}
      {/*    color="secondary"*/}
      {/*    onClick={onClickRemoveNotification}*/}
      {/*  >*/}
      {/*    Close*/}
      {/*  </Button>*/}
      {/*</Card.Content>*/}
    </Card>
  );
};

export default ToastCard;
