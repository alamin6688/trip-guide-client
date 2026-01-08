import Bookings from "@/components/modules/Guide/GuideBookingsData/Bookings";
import { getBookingsForGuide } from "@/services/admin/guidesManagement";

const BookingsPage = async () => {
  const bookingResult = await getBookingsForGuide();
  const bookingsData = bookingResult.success ? bookingResult.data : [];
  return <Bookings bookingsData={bookingsData} />;
};

export default BookingsPage;
