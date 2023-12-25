class ListNode:
    def __init__(self, value=0, next=None):
        self.value = value
        self.next = next

def partition_linked_list(head, x):
    # Initialize two separate lists for elements less than x and greater than or equal to x
    less_than_x = ListNode()
    greater_than_or_equal_to_x = ListNode()
    
    # Initialize pointers for the two lists
    less_than_x_current = less_than_x
    greater_than_or_equal_to_x_current = greater_than_or_equal_to_x
    
    # Traverse the original linked list
    current = head
    while current:
        # Check the value and update the corresponding list
        if current.value < x:
            less_than_x_current.next = ListNode(current.value)
            less_than_x_current = less_than_x_current.next
        else:
            greater_than_or_equal_to_x_current.next = ListNode(current.value)
            greater_than_or_equal_to_x_current = greater_than_or_equal_to_x_current.next
        
        # Move to the next node in the original list
        current = current.next
    
    # Connect the two lists
    less_than_x_current.next = greater_than_or_equal_to_x.next
    
    # Return the modified list
    return less_than_x.next

# Helper function to print the linked list
def print_linked_list(head):
    while head:
        print(head.value, end=" > " if head.next else "\n")
        head = head.next

# Example usage:
# Creating a linked list: 3 -> 1 -> 4 -> 4 -> 2 -> 5
linked_list = ListNode(3, ListNode(1, ListNode(4, ListNode(4, ListNode(2, ListNode(5))))))

# Target Value: 4
target_value = 4

# Calling the function to partition the linked list
modified_list = partition_linked_list(linked_list, target_value)

# Printing the modified linked list
print("Modified List:")
print_linked_list(modified_list)
