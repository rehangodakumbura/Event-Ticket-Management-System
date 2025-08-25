import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.LinkedList;
import java.util.Queue;

public class TicketPool {
    private final Queue<Integer> ticketQueue = new LinkedList<>();
    private final int totalTickets;
    private final int maxCapacity;
    private int issuedTickets = 0;
    private final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    public TicketPool(int totalTickets, int maxCapacity) {
        this.totalTickets = totalTickets;
        this.maxCapacity = maxCapacity;
    }


    public synchronized boolean addTickets(int count, String vendorName) {
        if (issuedTickets >= totalTickets) {
            return false; // No more tickets to issue
        }

        int ticketsToAdd = Math.min(count, Math.min(maxCapacity - ticketQueue.size(), totalTickets - issuedTickets));
        for (int i = 0; i < ticketsToAdd; i++) {
            ticketQueue.add(++issuedTickets);
        }
        String currentTime = LocalDateTime.now().format(formatter);
        System.out.println(currentTime + " - " + vendorName + " added " + ticketsToAdd + " tickets. Current pool size: " + ticketQueue.size());
        notifyAll(); // Notify waiting customers
        return true;
    }

    // Synchronized method for customers to remove tickets
    public synchronized boolean removeTicket(String customerName) {
        while (ticketQueue.isEmpty()) {
            if (issuedTickets >= totalTickets) {
                return false; // No tickets left to buy
            }
            try {
                wait(); // Wait for tickets to be added
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                return false;
            }
        }

        Integer ticket = ticketQueue.poll();
        String currentTime = LocalDateTime.now().format(formatter);
        System.out.println(currentTime + " - " + customerName + " purchased Ticket-" + ticket + ". Remaining tickets: " + ticketQueue.size());
        notifyAll(); // Notify vendors
        return true;
    }

    // Check if all tickets are issued
    public synchronized boolean allTicketsIssued() {
        return issuedTickets >= totalTickets;
    }

    // Get available tickets
    public synchronized int getAvailableTickets() {
        return ticketQueue.size();
    }
}
