import './ExploreContainer.css';

interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  return (
    <div className="container">
      <strong>{name}</strong>
      <p>We are still working on that page! Expect it soon! Btw, you can see our ready create new group page!</p>
    </div>
  );
};

export default ExploreContainer;
