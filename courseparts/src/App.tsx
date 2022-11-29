// new types
// Exercise 9.15
interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CourseNormalPart extends CoursePartBase {
  type: "normal";
  description: string;
}

interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartBase {
  type: "submission";
  description: string;
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CoursePartBase {
  type: "special";
  description: string;
  requirements: string[];
}

type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;

interface SwitchComponentProps {
  type: string;
  description?: string;
  groupProjectCount?: number;
  exerciseSubmissionLink?: string;
  requirements?: string[];
}

const SwitchComponent = ({type, description, groupProjectCount, exerciseSubmissionLink, requirements}: SwitchComponentProps) => {
  switch (type) {
    case "normal":
      return (<i>{description}</i>)
    case "groupProject":
      return (<div>{`project exercises ${groupProjectCount}`}</div>)
    case "submission":
      return (<>
          <i>{description}</i>
          <div>{`submit to ${exerciseSubmissionLink}`}</div>
        </>
      )
    case "special":
      return (<>
        <i>{description}</i>
        {requirements ? <div>{`required skills: ${requirements.join(', ')}`}</div> : null}
      </>)
    default:
      return (<div>{description}</div>);
  }
}

interface CourseProps extends SwitchComponentProps{
  name: string;
  exerciseCount: number;
}
// Content component
const Part = ({name, exerciseCount, type, description, groupProjectCount, exerciseSubmissionLink, requirements}: CourseProps) => {
  return (
    <>
      <h4>
        {name} {exerciseCount}
      </h4>
      <SwitchComponent 
        type={type}
        description={description}
        groupProjectCount={groupProjectCount}
        exerciseSubmissionLink={exerciseSubmissionLink}
        requirements={requirements}
      />
    </>
  )
}

interface HeaderProps {
  name: string;
}

// Header component
const Header = ({ name }: HeaderProps) => {
  return (
    <h2>{name}</h2>
  )
}

interface Courses {
  courseParts: CourseProps[]
}

const Content = ({ courseParts }: Courses) => {
  return (
    <>
      {courseParts.map(part => 
        <Part 
          key={part.name} 
          name={part.name} 
          exerciseCount={part.exerciseCount}
          type={part.type}
          description={part.description}
          groupProjectCount={part.groupProjectCount}
          exerciseSubmissionLink={part.exerciseSubmissionLink}
          requirements={part.requirements}
        />)}
    </>
  )
}

// Total component
const Total = ({ courseParts }: Courses) => {
  return (
    <p>
      Number of exercises{" "}
      {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  )
}

const App = () => {
  const courseName = "Half Stack application development";
  // this is the new coursePart variable
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the easy course part",
      type: "normal"
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the hard course part",
      type: "normal"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission"
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      type: "special"
    }
  ]

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;