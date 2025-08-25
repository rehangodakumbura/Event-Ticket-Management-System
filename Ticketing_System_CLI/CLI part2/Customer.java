public class Customer implements Runnable {
    private final TicketPool ticketPool;
    private final int retrievalRate;

    public Customer(TicketPool ticketPool, int retrievalRate) {
        this.ticketPool = ticketPool;
        this.retrievalRate = retrievalRate;
    }

    @Override
    public void run() {
        while (true) {
            synchronized (ticketPool) {
                if (ticketPool.allTicketsIssued() && ticketPool.getAvailableTickets() == 0) {
                    break;
                }
            }

            boolean success = ticketPool.removeTicket("Customer");
            if (!success) {
                break;
            }

            try {
                Thread.sleep(retrievalRate); // Simulate time taken to buy a ticket
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                break;
            }
        }
        System.out.println("Customer finished purchasing tickets.");
    }
}
