/* eslint-disable no-unused-vars */
import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Checkbox from "../../ui/Checkbox";
import Spinner from "../../ui/Spinner";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useEffect, useState } from "react";
import { useBooking } from "../bookings/useBooking";
import { formatCurrency } from "../../utils/helpers";
import { useChecking } from "./useChecking";


const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const { booking, isLoading } = useBooking();
  console.log('booking ??', booking);
  const [confirmedPaid, setConfirmedPaid] = useState(false);
  const moveBack = useMoveBack();
  useEffect(() => setConfirmedPaid(booking?.isPaid ?? false), [booking]);
  const { checkin, isCheckingIn } = useChecking();
  
  if (isLoading) return <Spinner />; //! attention to this: this line should be top of booking destructuring! ;)
  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;
  

  
  
  function handleCheckin() {
    if (!confirmedPaid) return;
    checkin(bookingId);
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      <Box>
        <Checkbox disabled={confirmedPaid || isCheckingIn } checked={confirmedPaid} id="confirm" onChange={()=>  setConfirmedPaid((confirm) => !confirm)} >I confirm that {guests.fullName} has paid the total amount of {" "} {formatCurrency(totalPrice)} </Checkbox>
      </Box>

      <ButtonGroup>
        <Button disabled={!confirmedPaid || isCheckingIn} onClick={handleCheckin}>Check in booking #{bookingId}</Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
