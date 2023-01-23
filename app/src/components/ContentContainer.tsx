import styled from '@emotion/styled';
import React from 'react';

const Container = styled('div')({
   flex: 1,
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
});

const ContentContainer = (props: React.HTMLProps<HTMLDivElement>) => {
   return (
      <Container>
         <div style={{ flex: 1, width: '100%', maxWidth: 600 }} {...props} />
      </Container>
   );
};

export default ContentContainer;
