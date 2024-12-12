import { fetchWorkouts } from '../api/api';
import { ElementDetails } from '../components/ElementDetails';
import { Form } from '../components/Form';
import { useQuery } from '@tanstack/react-query';
import { StatisticsPanel } from '../components/StatisticsPanel.tsx/StatisticsPanel';

export const Home = () => {
	const { data: workouts, isLoading, isError, error } = useQuery({ 
		queryKey: ['workouts'], 
		queryFn: fetchWorkouts,
		staleTime: Infinity, // set data stored in cache for infinity, no repeated request
	});

	const dataFromNewest = workouts ? [...workouts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) : [];

	if (isError) {
		return <div>{error.message}</div>
	}

	return (
		<>
			<h2>Trainings</h2>
			<StatisticsPanel workouts={workouts} />
			<div className="home">
				<div className="workouts">
					{workouts?.length === 0 && <div>Let's do some training and add one!</div>}
					{isLoading && <div>Loading...</div>}
					{dataFromNewest?.map((el: any) => <ElementDetails key={el._id} workout={el}>{el.title}</ElementDetails>)}
				</div>
				<Form />
			</div>
		</>
	)
}
