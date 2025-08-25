public class Vendor implements Runnable {
    private final TicketPool ticketPool;
    private final int releaseRate;
    private final String vendorName;

    public Vendor(TicketPool ticketPool, int releaseRate, String vendorName) {
        this.ticketPool = ticketPool;
        this.releaseRate = releaseRate;
        this.vendorName = vendorName;
    }

    @Override
    public void run() {
        while (!ticketPool.allTicketsIssued()) {
            synchronized (ticketPool) {
                if (!ticketPool.addTickets(5, vendorName)) { // Add up to 5 tickets per batch
                    break;
                }
            }

            try {
                Thread.sleep(releaseRate); // Simulate ticket issuing delay
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                break;
            }
        }
        System.out.println(vendorName + " finished issuing tickets.");
    }
}
