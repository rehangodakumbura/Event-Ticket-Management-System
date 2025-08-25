import java.io.*;
import com.google.gson.Gson;

public class Configuration {
    private int totalTickets;
    private int ticketReleaseRate;
    private int customerRetrievalRate;
    private int maxTicketCapacity;

    public int getTotalTickets() {
        return totalTickets;
    }

    public void setTotalTickets(int totalTickets) {
        this.totalTickets = totalTickets;
    }

    public int getTicketReleaseRate() {
        return ticketReleaseRate;
    }

    public void setTicketReleaseRate(int ticketReleaseRate) {
        this.ticketReleaseRate = ticketReleaseRate;
    }

    public int getCustomerRetrievalRate() {
        return customerRetrievalRate;
    }

    public void setCustomerRetrievalRate(int customerRetrievalRate) {
        this.customerRetrievalRate = customerRetrievalRate;
    }

    public int getMaxTicketCapacity() {
        return maxTicketCapacity;
    }

    public void setMaxTicketCapacity(int maxTicketCapacity) {
        this.maxTicketCapacity = maxTicketCapacity;
    }

    // Save configuration to a file
    public void saveToFile(String fileName) {
        try (Writer writer = new FileWriter(fileName)) {
            Gson gson = new Gson();
            gson.toJson(this, writer);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    // Load configuration from a file
    public static Configuration loadFromFile(String fileName) {
        try (Reader reader = new FileReader(fileName)) {
            Gson gson = new Gson();
            return gson.fromJson(reader, Configuration.class);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }
}
