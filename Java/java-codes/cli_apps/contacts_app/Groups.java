package cli_apps.contacts_app;

import java.util.List;

public class Groups {
    private char groupName;
    private List<User> contactList;

    public Groups(char groupName) {
        this.groupName = groupName;
    }

    public char getGroupName() {
        return groupName;
    }

    public void setGroupName(char groupName) {
        this.groupName = groupName;
    }

    public List<User> getContactList() {
        return contactList;
    }

    public void setContactList(List<User> contactList) {
        this.contactList = contactList;
    }
}
