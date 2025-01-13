import { useState } from 'react';
import { deleteDataFetch, fetchWorkouts } from '../api/api';
import { ElementDetails } from '../components/ElementDetails';
import { Form } from '../components/Form/Form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { StatisticsPanel } from '../components/StatisticsPanel.tsx/StatisticsPanel';
import { DateRange } from '../components/DateRange/DateRange';
import { ErrorHandlerAndLogout } from '../components/ErrorHandlerAndLogout';
import { Notifications, ResultType } from '../components/Notifications/Notifications';
import { useNotification } from '../components/Notifications/useNotificationsHook';

export const Home = () => {
	const [dateRange, setDateRange] = useState({ start: null, end: null });
	const { notification, showNotification, hideNotification } = useNotification();

	const queryClient = useQueryClient()
	const { data: workouts, isLoading, isError, error } = useQuery({ 
		queryKey: ['workouts'], 
		queryFn: fetchWorkouts,
		staleTime: Infinity, // set data stored in cache for infinity, no repeated request
	});

	const deleteMutation = useMutation({
    mutationFn: (id) => deleteDataFetch(id), 
    onSuccess: () => {
			showNotification(ResultType.SUCCESS, 'Workout deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['workouts'] });
    },
		onError: () => showNotification(ResultType.ERROR, 'Workout not deleted'),
  });

  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };

	if (isError) return <ErrorHandlerAndLogout error={error} />

	const filteredWorkouts = workouts ? workouts.filter(workout => {
		const workoutDate = new Date(workout.date).getTime();
		const startDate = dateRange.start ? new Date(dateRange.start).getTime() : null;
		const endDate = dateRange.end ? new Date(dateRange.end).getTime() : null;

		return (!startDate || workoutDate >= startDate) && (!endDate || workoutDate <= endDate);
	}).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) : [];
	
	return (
		<>
			<h2>Trainings</h2>
			<div className="flex-justify-column">
				<StatisticsPanel workouts={filteredWorkouts} />
				<DateRange setDateRange={setDateRange} />
				<div className="home">
					<div className="workouts">
						{workouts?.length === 0 && <div>Let's do some training and add one!</div>}
						{isLoading && <div>Loading...</div>}
						{filteredWorkouts?.map((el: any) => <ElementDetails key={el._id} workout={el} onDelete={handleDelete}>{el.title}</ElementDetails>)}
					</div>
					<Form />
				</div>

				<Notifications 
					isOpen={notification.isOpen}
					result={notification.result}
					message={notification.message}
					onClose={hideNotification}
				/>
			</div>
		</>
	)
}
