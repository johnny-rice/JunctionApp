import React from 'react';
import { connect } from 'react-redux';
import { Typography, Link, Grid, Box } from '@material-ui/core';
import Button from 'components/generic/Button';
import { Input } from 'antd';
import { changeMessageValue } from 'redux/recruitment/actions';

import { sendMessage } from 'redux/recruitment/actions';

const getListOf = (areas, subject) => {
  if (areas && areas.length !== 0)
    return (
      <Box mb={1} sm={12} md={6} lg={6}>
        {subject === 'theme' ? (
          <Typography variant="h6">Themes of interest</Typography>
        ) : (
          <Typography variant="h6">Industries of interest</Typography>
        )}
        {areas.map(area => {
          return <Typography key={area}>{area}</Typography>;
        })}
      </Box>
    );
};

const getActionHistory = history => {
  if (history && history.length !== 0)
    return (
      <Grid item mb={1} sm={12} md={6} lg={6}>
        <Typography variant="subtitle1">Previous messages</Typography>
        {history.map(action => {
          return <Typography key={action}>{action}</Typography>;
        })}
      </Grid>
    );
};

const getPrevEvents = events => {
  if (events && events.length !== 0)
    return (
      <Grid item mb={1} sm={12} md={6} lg={6}>
        <Typography variant="h6">Hackathons</Typography>
        {events.map(event => {
          return <Typography key={event.id}>{event.name}</Typography>;
        })}
      </Grid>
    );
};

const RecruitmentProfileInfo = React.memo(
  ({ participant, sendMessage, changeMessageValue, messageValue }) => {
    const {
      themesOfInterest,
      industriesOfInterest,
      previousEvents,
      social
    } = participant;
    const { recruitmentActionHistory, firstName } = participant.profile;
    return (
      <Grid container>
        <Grid container direction="column" justify="space-between">
          {social && Object.entries(social).length !== 0 && (
            <Grid item mb={2} sm={12} md={6} lg={6}>
              <Typography variant="h6">On other media</Typography>
              {Object.keys(social).map(service => {
                return (
                  <Typography>
                    <Link>{social[service]}</Link>
                  </Typography>
                );
              })}
            </Grid>
          )}
          {getListOf(themesOfInterest, 'theme')}
          {getListOf(industriesOfInterest, 'industry')}
          {getPrevEvents(previousEvents)}
        </Grid>
        <Grid item sm={12} md={8} lg={6}>
          <Typography variant="h6">Contact</Typography>
          <Typography variant="b">Action history here</Typography>
          {getActionHistory(recruitmentActionHistory)}
          <Typography>Send {firstName} a message</Typography>
          <Input.TextArea
            onChange={e => changeMessageValue(e.target.value)}
            value={messageValue}
            autosize={{ minRows: 10, maxRows: 20 }}
            placeholder="Max 1000 characters"
          />
          <Button
            block
            text="Send"
            button={{
              onClick: () => sendMessage(messageValue, participant.userId)
            }}
          />
        </Grid>
      </Grid>
    );
  }
);

const mapState = state => ({
  messageValue: state.recruitment.messageValue
});

const mapDispatch = dispatch => ({
  changeMessageValue: value => dispatch(changeMessageValue(value)),
  sendMessage: (message, profileId) => dispatch(sendMessage(message, profileId))
});

export default connect(
  mapState,
  mapDispatch
)(RecruitmentProfileInfo);