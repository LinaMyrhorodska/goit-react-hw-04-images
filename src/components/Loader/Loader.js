import { BallTriangle } from 'react-loader-spinner';
import { LoaderContainer } from './Loader.styled';


export const Loader = () => {
    return (<LoaderContainer>
       <BallTriangle
  height={100}
  width={100}
  radius={5}
  color="#4fa94d"
  ariaLabel="ball-triangle-loading"
            visible={true}
             wrapperStyle={{
          bottom: 0,
    height: 60,
    left: 0,
    margin: 'auto',
    position: 'absolute',
    right: 0,
    top: 0,
    width: 100,
        }}
        />
        </LoaderContainer>
    )
};
