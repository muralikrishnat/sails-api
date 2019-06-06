/* tslint:disable */
export const util = {
    isDescendant(parent, child) {
        let node = child.parentNode;
        while (node != null) {
            if (node == parent) {
                return true;
            }
            node = node.parentNode;
            console.log('node-child, ', node, parent);
        }
        return false;
    }
};