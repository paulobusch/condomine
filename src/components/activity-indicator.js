import React from 'react';
import { ActivityIndicator as ActivityIndicatorPaper, withTheme } from 'react-native-paper';

type ActivityIndicatorProps = React.ComponentProps<typeof ActivityIndicatorPaper>;

const ActivityIndicator = (props: ActivityIndicatorProps) => {
    const { theme } = props;
    const containerHeight = props.containerHeight ? (props.containerHeight - 100) : null;
    return (
        <ActivityIndicatorPaper size="large"
            { ...props } color={ theme.primary } 
            style={ { height: containerHeight } } 
        />
    );
}

export default withTheme(ActivityIndicator);