import { fetchWorkouts } from '../api/api';
import { ElementDetails } from '../components/ElementDetails';
import { Form } from '../components/Form';
import { useQuery } from '@tanstack/react-query';

export const Home = () => {
	const { data: workouts, isLoading, isError, error } = useQuery({ 
		queryKey: ['workouts'], 
		queryFn: fetchWorkouts,
		staleTime: Infinity, // set data stored in cache for infinity, no repeated request
	});

	if (isError) {
		return <div>{error.message}</div>
	}

	return (
		<>
			<h2>Home</h2>
			<div className="home">
				<div className="workouts">
					{isLoading && <div>Loading...</div>}
					{workouts?.map((el: any) => <ElementDetails key={el._id} workout={el}>{el.title}</ElementDetails>)}
				</div>
				<Form />
			</div>
		</>
	)
}
