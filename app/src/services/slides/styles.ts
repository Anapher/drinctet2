import { styled } from '@mui/system';
import { TypographyProps } from '@mui/material';

export const mainTextFontSize: TypographyProps['fontSize'] = {
   xs: 16,
   md: 20,
};

export const descriptionTextFontSize: TypographyProps['fontSize'] = {
   xs: 12,
   sm: 14,
   lg: 16,
};

export const CardContainer = styled('div')({
   display: 'flex',
   flexDirection: 'column',
   width: '100%',
   height: '100%',
   color: 'white',
});

export const CenteredCardContainer = styled(CardContainer)({
   alignItems: 'center',
});

export const CardHeader = styled('div')(({ theme }) => ({
   flex: 1,
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   justifyContent: 'flex-end',
   paddingBottom: theme.spacing(2),
   paddingLeft: theme.spacing(3),
   paddingRight: theme.spacing(3),
}));

export const CardBottom = styled('div')(({ theme }) => ({
   flex: 1,
   paddingTop: theme.spacing(2),
   paddingLeft: theme.spacing(3),
   paddingRight: theme.spacing(3),
}));

export const CardMainContent = styled('div')(({ theme }) => ({
   paddingLeft: theme.spacing(3),
   paddingRight: theme.spacing(3),
   maxWidth: 1200,
}));

export const titleTypographyProps: TypographyProps = {
   fontSize: { xs: 16, md: 20 },
   fontWeight: 400,
};
