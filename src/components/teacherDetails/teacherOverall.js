import styled from "styled-components";

const ProgressSection = styled.div`
    width: 259px;
    height: 100%;
`;

const ProgressBar = styled.div`
  width: ${({ progress }) => progress};
  height: 100%;
  background-color: ${({ progress }) => {
      const num = progress.slice(0, -1);
      const integer = parseInt(num);
      if (integer > 80) return "red";
      else if (integer > 60) return "orange";
      else if (integer > 40) return "yellow";
      else return "green";
  }};
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
`;

const StyledSection = styled.div`
    background-color: #ffffff;
    border: solid 2px grey;
    width: 302px;
    height: 35px;
    border-radius: 10px;
    font-size: 15px;
    display: flex;
    justify-content: left;
    align-items: center;
`;

const StyledSpan = styled.span`
  padding-right: 3px;
  margin-left: 4px;
  border-right: solid 2px black;
  height: 35px;
  display: flex;
  align-items: center;
`

export default function TeacherOverall({name, value}){
    return(
        <>
            <StyledSection>
                <StyledSpan>{name}</StyledSpan>
                <ProgressSection><ProgressBar progress={value} /></ProgressSection>
            </StyledSection>
        </>
    )
}